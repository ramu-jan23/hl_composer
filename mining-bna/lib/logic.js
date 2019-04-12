/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Create transaction
 * @param {org.land.mining.participant.InvokeLandCreation} createLandTx
 * @transaction
 */
async function createLandTx(tx) {
    
    var factory = getFactory();
    // Create the land asset.
    var asset = factory.newResource('org.land.mining', 'Land', tx.landId);

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.land.mining.Land');

    asset.coordinates = tx.coordinates
    asset.ore = tx.ore
    asset.value = tx.value
    asset.status = "Created"
    asset.mining_company = tx.mining_company
    // Add the asset in the asset registry.
    await assetRegistry.add(asset);

}

/**
 * Approve/Deny transaction
 * @param {org.land.mining.participant.ApproveLandTx} approveLandTx
 * @transaction
 */
async function approveLandTx(tx){

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.land.mining.Land');

    tx.land.status = "Approved"

    // Add the asset in the asset registry.
    await assetRegistry.update(tx.land);
}



/**
 * Transfer transaction request
 * @param {org.land.mining.participant.TransferLandTx} transferLandTx
 * @transaction
 */
async function transferLandTx(tx){

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.land.mining.Land');

    tx.land.status = "Transfer"
  	tx.land.mining_company = tx.mining_company

    // Add the asset in the asset registry.
    await assetRegistry.update(tx.land);
}


/**
 * Approve Transfer transaction request
 * @param {org.land.mining.participant.ApproveTransferTx} approveTransferTx
 * @transaction
 */
async function approveTransferTx(tx){

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.land.mining.Land');

    tx.land.status = "Approved"

    // Add the asset in the asset registry.
    await assetRegistry.update(tx.land);
}