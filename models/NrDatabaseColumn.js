import AssertUtils from "../../utils/src/AssertUtils";

/**
 * @implements {NrModel}
 */
export class NrDatabaseColumn {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return "NrDatabaseColumn";
    }

    /**
     *
     * @param value {object}
     * @returns {NrDatabaseColumn}
     */
    static parseValue (value) {

        AssertUtils.isObject(value);

        const {
            nrName,
            name,
            type,
            nullable,
            primaryKey,
            defaultValue
        } = value;

        AssertUtils.isEqual(nrName, this.nrName);

        // noinspection JSCheckFunctionSignatures
        return new NrDatabaseColumn(name, type, {nullable, primaryKey, defaultValue});

    }

    /**
     *
     * @param name {string} Column name
     * @param type {NrDatabaseType} Column type
     * @param nullable {boolean}
     * @param primaryKey {boolean}
     * @param defaultValue {*}
     */
    constructor (
        name,
        type,
        {
            nullable = false,
            defaultValue = undefined,
            primaryKey = false
        } = {}
    ) {

        AssertUtils.isString(name);
        AssertUtils.isString(type);
        AssertUtils.isBoolean(nullable);
        AssertUtils.isBoolean(primaryKey);

        /**
         *
         * @member {string}
         * @private
         */
        this._name = name;

        /**
         *
         * @member {NrDatabaseType}
         * @private
         */
        this._type = type;

        /**
         *
         * @member {boolean}
         * @private
         */
        this._nullable = nullable;

        /**
         *
         * @member {boolean}
         * @private
         */
        this._primaryKey = primaryKey;

        /**
         *
         * @member {*}
         * @private
         */
        this._defaultValue = defaultValue;

    }

    /**
     *
     * @returns {typeof NrDatabaseColumn}
     */
    get Class () {
        return NrDatabaseColumn;
    }

    /**
     *
     * @returns {string}
     */
    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @returns {string}
     */
    get name () {
        return this._name;
    }

    /**
     *
     * @returns {NrDatabaseType}
     */
    get type () {
        return this._type;
    }

    /**
     *
     * @returns {boolean}
     */
    get nullable () {
        return this._nullable;
    }

    /**
     *
     * @returns {boolean}
     */
    get primaryKey () {
        return this._primaryKey;
    }

    /**
     *
     * @returns {*}
     */
    get defaultValue () {
        return this._defaultValue;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            nrName: this.nrName,
            name: this.name,
            type: this.type,
            nullable: this.nullable ? true : undefined,
            primaryKey: this.primaryKey ? true : undefined,
            defaultValue: this.defaultValue
        };
    }

    /**
     *
     * @returns {Object}
     */
    toJSON () {
        return this.valueOf();
    }

}

export default NrDatabaseColumn;
