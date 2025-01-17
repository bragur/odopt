/**
 * Dopt Users API
 * The Dopt Users API
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The IdentifyBulkResponseBody model module.
 * @module model/IdentifyBulkResponseBody
 * @version 0.0.0
 */
class IdentifyBulkResponseBody {
    /**
     * Constructs a new <code>IdentifyBulkResponseBody</code>.
     * @alias module:model/IdentifyBulkResponseBody
     * @param count {Number} 
     */
    constructor(count) { 
        
        IdentifyBulkResponseBody.initialize(this, count);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, count) { 
        obj['count'] = count;
    }

    /**
     * Constructs a <code>IdentifyBulkResponseBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IdentifyBulkResponseBody} obj Optional instance to populate.
     * @return {module:model/IdentifyBulkResponseBody} The populated <code>IdentifyBulkResponseBody</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IdentifyBulkResponseBody();

            if (data.hasOwnProperty('count')) {
                obj['count'] = ApiClient.convertToType(data['count'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} count
 */
IdentifyBulkResponseBody.prototype['count'] = undefined;






export default IdentifyBulkResponseBody;

