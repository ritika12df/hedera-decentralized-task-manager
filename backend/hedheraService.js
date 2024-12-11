const {
    Client,
    AccountId,
    PrivateKey,
    Hbar,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TransferTransaction,
    TopicMessageSubmitTransaction,
    TopicCreateTransaction,
} = require('@hashgraph/sdk');

require('dotenv').config();

// Set up client
const operatorAccountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);
const operatorPrivateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

const client = Client.forTestnet(); 
client.setOperator(operatorAccountId, operatorPrivateKey);

let topicId = null;
let tokenId = null;

// Function to create a token
async function createToken() {
    const tokenTransaction = await new TokenCreateTransaction()
        .setTokenName("Ritika")
        .setTokenSymbol("RS")
        .setTokenType(TokenType.Fungible)
        .setDecimals(0)
        .setInitialSupply(1000000)
        .setTreasuryAccountId(operatorAccountId)
        .setAdminKey(operatorPrivateKey.publicKey)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(1000000)
        .execute(client);

    const receipt = await tokenTransaction.getReceipt(client);
    tokenId = receipt.tokenId.toString();
    console.log(`Token created with ID: ${tokenId}`);
    return tokenId;
}

// Function to transfer tokens
async function rewardUser(userAccountId, amount) {
    if (!tokenId) {
        console.log("Token ID not found. Creating a new token...");
        tokenId = await createToken();
        return tokenId; ;
    }

    const transaction = await new TransferTransaction()
        .addTokenTransfer(tokenId, operatorAccountId, -amount) // Deduct from treasury
        .addTokenTransfer(tokenId, userAccountId, amount) // Transfer to user
        .setMaxTransactionFee(new Hbar(2))
        .execute(client);

    const receipt = await transaction.getReceipt(client);
    console.log(`Tokens transferred: ${amount} to user ${userAccountId}. Status: ${receipt.status}`);
    return receipt;
}

// Function to create a new topic
async function createTopic() {
    const transaction = await new TopicCreateTransaction()
        .setMaxTransactionFee(new Hbar(2)) // Adjust fee as needed
        .execute(client);

    const receipt = await transaction.getReceipt(client);
    const newTopicId = receipt.topicId.toString();
    console.log(`Topic created with ID: ${newTopicId}`);
    return newTopicId;
}

// Create a task and reward user
async function submitTaskAndReward(taskData, userAccountId) {
    if (!topicId) {
        console.log("No topic ID found. Creating a new topic...");
        topicId = await createTopic();
    }

    const transaction = await new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(JSON.stringify(taskData))
        .setMaxTransactionFee(new Hbar(2))
        .execute(client);

    const receipt = await transaction.getReceipt(client);
    console.log("Task submitted:", receipt.status);

    const rewardAmount = 10; // Define token reward amount
    await rewardUser(userAccountId, rewardAmount);

    // Return response
    return {
        status: receipt.status.toString(),
        rewardAmount,
    };
}

module.exports = {
    createToken,
    rewardUser,
    submitTaskAndReward,
};
