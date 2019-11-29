import AssertUtils from "../../utils/src/AssertUtils";

/**
 * @implements {NrModel}
 */
export class NrDatabaseTable {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return "NrDatabaseTable";
    }

    /**
     *
     * @param value {object}
     * @returns {NrDatabaseTable}
     */
    static parseValue (value) {

        AssertUtils.isObject(value);

        const {
            nrName,
            name,
            columns
        } = value;

        AssertUtils.isEqual(nrName, this.nrName);

        return new NrDatabaseTable(name, columns);

    }

    /**
     *
     * @param name {string}
     * @param columns {Array.<DatabaseColumn>}
     */
    constructor (name, columns) {

        AssertUtils.isString(name);

        // FIXME: Should check array values too
        AssertUtils.isArray(columns);

        /**
         * @member {string}
         * @private
         */
        this._name = name;

        /**
         *
         * @member {ReadonlyArray<DatabaseColumn>}
         * @private
         */
        this._columns = Object.freeze(columns);

    }

    /**
     *
     * @returns {typeof NrDatabaseTable}
     */
    get Class () {
        return NrDatabaseTable;
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
     * @returns {ReadonlyArray<DatabaseColumn>}
     */
    get columns () {
        return this._columns;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            nrName: this.nrName,
            name: this.name,
            columns: this.columns
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

export default NrDatabaseTable;
