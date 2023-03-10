module.exports = function (RED) {
	"use strict";
	function RandomStringNode(n) {
		RED.nodes.createNode(this, n);

		this.size = n.size || 16;
		this.characters = n.characters || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.property = n.property || "payload";
		let node = this;
		this.on('input', function (msg) {
			let characters = msg.characters || node.characters;
			let size = Number(msg.size || node.size);
			let payload = '';
			for (let i = 0; i < size; i++) {
				payload += characters.charAt(Math.floor(Math.random() * characters.length));
			}
			RED.util.setMessageProperty(msg, node.property, payload);
			node.send(msg);
		});
	}
	RED.nodes.registerType("random-string", RandomStringNode);
}