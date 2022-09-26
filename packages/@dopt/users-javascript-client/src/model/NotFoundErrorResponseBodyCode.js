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
 * The NotFoundErrorResponseBodyCode model module.
 * @module model/NotFoundErrorResponseBodyCode
 * @version 0.0.0
 */
class NotFoundErrorResponseBodyCode {
    /**
     * Constructs a new <code>NotFoundErrorResponseBodyCode</code>.
     * @alias module:model/NotFoundErrorResponseBodyCode
     */
    constructor() { 
        
        NotFoundErrorResponseBodyCode.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>NotFoundErrorResponseBodyCode</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NotFoundErrorResponseBodyCode} obj Optional instance to populate.
     * @return {module:model/NotFoundErrorResponseBodyCode} The populated <code>NotFoundErrorResponseBodyCode</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new NotFoundErrorResponseBodyCode();

        }
        return obj;
    }


}






export default NotFoundErrorResponseBodyCode;

