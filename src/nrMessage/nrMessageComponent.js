import template from "./nr-message-template.html";
import { NrMessageController } from "./nrMessageController.js";
import "./nr-message-styles.scss";

export const nrMessageComponent = {
	template,
	controller: NrMessageController,
	bindings: NrMessageController.getBindings()
};

// noinspection JSUnusedGlobalSymbols
export default nrMessageComponent;
