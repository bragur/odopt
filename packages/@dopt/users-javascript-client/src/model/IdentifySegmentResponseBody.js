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
 * The IdentifySegmentResponseBody model module.
 * @module model/IdentifySegmentResponseBody
 * @version 0.0.0
 */
class IdentifySegmentResponseBody {
    /**
     * Constructs a new <code>IdentifySegmentResponseBody</code>.
     * @alias module:model/IdentifySegmentResponseBody
     * @param count {Number} 
     */
    constructor(count) { 
        
        IdentifySegmentResponseBody.initialize(this, count);
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
     * Constructs a <code>IdentifySegmentResponseBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IdentifySegmentResponseBody} obj Optional instance to populate.
     * @return {module:model/IdentifySegmentResponseBody} The populated <code>IdentifySegmentResponseBody</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IdentifySegmentResponseBody();

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
IdentifySegmentResponseBody.prototype['count'] = undefined;






export default IdentifySegmentResponseBody;
