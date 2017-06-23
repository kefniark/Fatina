/**
 * Simple doublylist used for events management
 * Optimized to apeend, remove and iterate
 *
 * @export
 * @abstract
 * @class EventList
 */
export abstract class EventList {
	public first: INode | undefined;
	public last: INode | undefined;
	public length = 0;

	public Add(obj: any): void {
		const newNode = this.GetNode(obj, this.last, undefined, this);
		if (this.first === undefined) {
			this.first = newNode;
			this.last = newNode;
		} else if (this.last !== undefined) {
			this.last.node_next = newNode;
			this.last = newNode;
		}
		this.length += 1;
	}

	public Remove(obj: any): void {
		const node = obj as INode;
		if (node === undefined) {
			console.log('Trying to remove an object which is not a node');
			return;
		}

		if (node.node_list !== this) {
			return;
		}

		// Removing any existing reference to the node
		if (node.node_next === undefined) {
			this.last = node.node_previous;
		} else {
			node.node_next.node_previous = node.node_previous;
		}

		if (node.node_previous === undefined) {
			this.first = node.node_next;
		} else {
			node.node_previous.node_next = node.node_next;
		}

		// Removing any existing reference from the node
		node.node_valid = false;
		node.node_previous = undefined;
		node.node_next = undefined;
		node.node_list = undefined;

		// One less node in the list
		this.length -= 1;
	}

	private GetNode(obj: any, previous: INode | undefined, next: INode | undefined, list: EventList): INode {
		const node = obj as INode;
		if (!node.node_valid) {
			node.node_valid = true;
			node.node_previous = previous;
			node.node_next = next;
			node.node_list = list;
		}
		return node;
	}
}

export interface INode {
	node_valid: boolean;
	node_previous: INode | undefined;
	node_next: INode | undefined;
	node_list: EventList | undefined;
}
