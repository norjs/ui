import _ from 'lodash';
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrModelUtils from "../../utils/NrModelUtils";
import StringUtils from "@norjs/utils/src/StringUtils";

const AUTO_KEYWORD = "auto";

/**
 * Can be used to join multiple view components in one element
 *
 * @implements {NrModel}
 */
export class NrGrid extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.GRID;
    }

    /**
     *
     * @returns {typeof NrGrid}
     */
    get Class () {
        return NrGrid;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * @returns {string}
     */
    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @param [id] {string}  The id of the grid
     * @param [columns] {Array.<number|string>|string} Grid column widths
     * @param [rows] {Array.<number|string>|string} Grid row heights
     * @param [content] {Array.<Array.<NrModel>>} Models per row and column
     */
    constructor ({
        id = undefined
        , columns = undefined
        , rows = undefined
        , content = []
    } = {}) {

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrGrid.nrName}(): id invalid: "${id}"`);
        }

        if ( columns !== undefined && !_.isArray(columns) ) {
            columns = NrGrid._parseColumns(columns);
        }

        // FIXME: Check array items too
        if ( columns !== undefined && !_.isArray(columns) ) {
            throw new TypeError(`new ${NrGrid.nrName}(): columns invalid: "${columns}"`);
        }

        if (_.isString(rows)) {
            rows = NrGrid._parseRows(rows);
        }

        // FIXME: Check array items too
        if ( rows !== undefined && !_.isArray(rows) ) {
            throw new TypeError(`new ${NrGrid.nrName}(): rows invalid: "${rows}"`);
        }

        // FIXME: This should check also NrView interface
        if ( content !== undefined && !_.isArray(content) ) {
            throw new TypeError(`new ${NrGrid.nrName}(): content invalid: "${content}"`);
        }

        super();

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._id = id;

        /**
         *
         * @member {ReadonlyArray.<number>|undefined}
         * @protected
         */
        this._columns = columns ? Object.freeze(_.concat([], columns)) : undefined;

        /**
         *
         * @member {ReadonlyArray.<number>|undefined}
         * @protected
         */
        this._rows = rows ? Object.freeze(_.concat([], rows)) : undefined;

        /**
         *
         * @member {ReadonlyArray.<NrView>}
         * @protected
         */
        this._content = Object.freeze(_.concat([], content));

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.GRID;
    }

    /**
     *
     * @returns {string}
     */
    get id () {
        return this._id;
    }

    /**
     *
     * @returns {ReadonlyArray.<number>}
     */
    get columns () {
        return this._columns;
    }

    /**
     *
     * @returns {ReadonlyArray.<number>}
     */
    get rows () {
        return this._rows;
    }

    /**
     *
     * @returns {ReadonlyArray.<ReadonlyArray.<NrModel>>}
     */
    get content () {
        return this._content;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , id: this._id
            , columns: _.map(this._columns, item => item)
            , rows: _.map(this._rows, item => item)
            , content: _.map(this._content, row => _.map(row, column => column.valueOf()))
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrGrid}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrGrid) {
            return value;
        }

        const {
            type
            , id
            , columns
            , rows
            , content
        } = value;

        if ( type !== NrObjectType.GRID ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        // FIXME: This should check array item types
        if ( !_.isNil(columns) && !_.isArray(columns) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's columns is not correct: "${columns}"`);
        }

        // FIXME: This should check array item types
        if ( !_.isNil(rows) && !_.isArray(rows) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's rows is not correct: "${rows}"`);
        }

        // FIXME: This should check value.content items NrView interface
        if ( !_.isNil(content) && !_.isArray(content) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's content is not correct: "${content}"`);
        }

        return new NrGrid({
              id        : !_.isNil(id)       ? id                                                    : undefined
            , columns   : !_.isNil(columns)  ? this._parseColumns(columns)                           : undefined
            , rows      : !_.isNil(rows)     ? this._parseRows(rows)                                 : undefined
            , content   : !_.isNil(content)  ? _.map(content, row => _.map(row, column => NrModelUtils.parseValue(column))) : undefined
        });

    }

    /**
     *
     * @param value {string|number|Array}
     * @returns {string[]}
     */
    static _parseColumns (value) {

        if (_.isString(value)) {
            return this._parseLayoutString(value);
        }

        if (_.isNumber(value)) {
            return [value];
        }

        if (_.isArray(value)) {
            return _.map(value, item => this._parseLayoutStringArrayItem(item));
        }

        throw new TypeError(`${this.nrName}.parseColumns(): Invalid value type: ${value}`);

    }

    /**
     *
     * @param value {string|number|Array}
     * @returns {string[]}
     */
    static _parseRows (value) {

        if (_.isString(value)) {
            return this._parseLayoutString(value);
        }

        if (_.isNumber(value)) {
            return [value];
        }

        if (_.isArray(value)) {
            return _.map(value, item => this._parseLayoutStringArrayItem(item));
        }

        throw new TypeError(`${this.nrName}.parseRows(): Invalid value type: ${value}`);

    }

    /**
     *
     * @param value {string}
     * @returns {string[]}
     */
    static _parseLayoutString (value) {

        return _.map(_.split(_.trim(value).replace(/ +/g, " "), " "),
            item => this._parseLayoutStringArrayItem(item)
        );

    }

    /**
     *
     * @param value
     * @returns {string|number}
     * @private
     */
    static _parseLayoutStringArrayItem (value) {

        if (_.isNumber(value)) {
            return value;
        }

        value = _.trim(value);

        if ( _.toLower(value) === AUTO_KEYWORD ) {
            return AUTO_KEYWORD;
        }

        if (value === "") {
            return "";
        }

        if ( value.length >= 2 && value[value.length-1] === '%') {

            const result = this._parseLayoutStringArrayItem(value.substr(0, value.length - 1 ));

            return _.isNumber(result) ? result / 100 : result;

        }

        if ( StringUtils.isInteger(value) ) {
            return StringUtils.strictParseInteger(value);
        }

        // FIXME: Implement StringUtils.isFloat() and StringUtils.parseFloat()
        return parseFloat(value);

    }

}

export default NrGrid;
