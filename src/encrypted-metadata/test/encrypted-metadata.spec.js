import assert from 'node:assert'
import { describe, it } from 'node:test'

import * as Types from '../types.js'
import { bytesToString } from '../utils.js'
import { create, extract } from '../index.js'
import * as Result from './helpers/result.js'


/** @type {Types.EncryptedMetadataInput} */
const encryptedMetadataInput = {
  encryptedDataCID: 'bafkreic3uudkp6wzosfsyhuufs3kphahjjxwu6k3w2iwjyb7mc6o7ymobi',
  cypherText:
    'mF3OPa9dQ0wO4B1/XylmAV/eaHhLtM3JUPIbS175bvmqGaJUYroyDbsytV29q0cLD4XCpCRfCinntASNg9s730FIM7f4Mw2hVWeJ5g4akFA6BoZoaKgDC5Ln6MOQK5Ymb1y6No7um7Bn4uIIJTYNuUukDQvVxzY8LcRBc2ySR1Md+VSGzmyEgyvHtAI=',
  dataToEncryptHash: '15f39e9a977cca43f16f3cd25237d711cd8130ff9763197b29df52a198607206',
  accessControlConditions: [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: '',
      parameters: [
        ':currentActionIpfsId',
        'did:key:z6MktfnQz8Kcz5nsC65oyXWFXhbbAZQavjg6LYuHgv4YbxzN'
      ],
      returnValueTest: {
        comparator: '=',
        value: 'QmPFrQGo5RAtdSTZ4bkaeDHVGrmy2TeEUwTu4LuVAPHiMd'
      }
    }
  ]
}

describe('Encrypted Metadata', () => {
  it('should create a valid CAR', async () => {
    const encryptedMetadata = create(encryptedMetadataInput)
    const result = await encryptedMetadata.archive()
    const car = Result.unwrap(result)

    const extractedData = Result.unwrap((extract(car)))

    const extractedDataJson = extractedData.toJSON()

    assert.equal(extractedDataJson.cypherText, encryptedMetadataInput.cypherText)
    assert.equal(extractedDataJson.dataToEncryptHash, encryptedMetadataInput.dataToEncryptHash)
    assert.equal(extractedDataJson.encryptedDataCID, encryptedMetadataInput.encryptedDataCID)
    assert.deepEqual(extractedData.accessControlConditions, encryptedMetadataInput.accessControlConditions)
  })
})
