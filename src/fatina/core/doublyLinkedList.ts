// /**
//  * The DoublyLinkedList class provides the main functionality of a doubly linked list.
//  *
//  * @class DoublyLinkedList
//  */
// export class DoublyLinkedList {
//     private length = 0;
//     private key = 0;
//     private head: IDoublyLinkedListNode | undefined;
//     private tail: IDoublyLinkedListNode | undefined;
//     private current: IDoublyLinkedListNode | undefined;

//     /**
//      * Pops a node from the end of the doubly linked list
//      *
//      * @method pop
//      * @return any  The value of the popped node.
//      */
//     public Pop(): any {
//         if (this.length === 0 || !this.tail) {
//             throw new Error('Can\'t pop from an empty data structure');
//         }

//         let value = this.tail.value;

//         this.tail = this.tail.prev;
//         if (this.tail) {
//             delete this.tail.next;
//             this.tail.next = undefined as any;
//         }

//         this.length--;

//         if (this.length === 0) {
//             delete this.head;
//             this.head = undefined;
//         }

//         return value;
//     }

//     /**
//      * Shifts a node from the beginning of the doubly linked list
//      *
//      * @method shift
//      * @return any  The value of the shifted node.
//      */
//     public Shift(): any {
//         if (this.length === 0 || !this.head) {
//             throw new Error('Can\'t shift from an empty data structure');
//         }

//         let value = this.head.value;

//         this.head = this.head.next;
//         if (this.head) {
//             delete this.head.prev;
//             this.head.prev = undefined as any;
//         }

//         this.length--;

//         return value;
//     }

//     /**
//      * Pushes an element at the end of the doubly linked list
//      *
//      * @method push
//      * @param value The value to push.
//      * @return void
//      */
//     public Push(value: any): void {
//         let node: IDoublyLinkedListNode = {
//             value: value,
//             prev: this.tail,
//             next: undefined
//         } as any;

//         if (this.length === 0 || !this.tail) {
//             this.head = this.tail = node;
//         } else {
//             this.tail.next = node;
//             this.tail = this.tail.next;
//         }

//         this.length++;
//     }

//     /**
//      * Prepends the doubly linked list with an element
//      *
//      * @method unshift
//      * @param value The value to unshift.
//      * @return void
//      */
//     public Unshift(value: any): void {
//         let node: IDoublyLinkedListNode = {
//             value: value,
//             prev: undefined,
//             next: this.head
//         } as any;

//         if (this.length === 0 || !this.head) {
//             this.head = this.tail = node;
//         } else {
//             this.head.prev = node;
//             this.head = this.head.prev;
//         }

//         this.length++;
//     }

//     /**
//      * Counts the number of elements in the doubly linked list
//      *
//      * @method count
//      * @return number the number of elements in the doubly linked list.
//      */
//     public Count(): number {
//         return this.length;
//     }

//     /**
//      * Checks whether the doubly linked list is empty
//      *
//      * @method isEmpty
//      * @return boolean whether the doubly linked list is empty.
//      */
//     public IsEmpty(): boolean {
//         return (this.length === 0);
//     }

//     /**
//      * Rewind iterator back to the start
//      *
//      * @method rewind
//      * @return void
//      */
//     public Reset(): void {
//         this.key = 0;
//         this.current = this.head;
//     }

//     /**
//      * Return current list entry
//      *
//      * @method current
//      * @return any  The current node value.
//      */
//     public Current(): any {
//         if (this.current) {
//             return this.current.value;
//         }
//         return undefined;
//     }

//     /**
//      * Return current node index
//      *
//      * @method key
//      * @return any  The current node index.
//      */
//     public Key(): any {
//         return this.key;
//     }

//     /**
//      * Move to next entry
//      *
//      * @method next
//      * @return void
//      */
//     public Next(): void {
// 		if (!this.current || !this.current.next) {
// 			this.current = undefined as any;
// 			return;
// 		}
//         this.current = this.current.next;
//         this.key++;
//     }

//     /**
//      * Move to previous entry
//      *
//      * @method prev
//      * @return void
//      */
//     public Prev(): void {
// 		if (!this.current || !this.current.prev) {
// 			this.current = undefined as any;
// 			return;
// 		}
//         this.current = this.current.prev;
//         this.key--;
//     }

//     /**
//      * Check whether the doubly linked list contains more nodes
//      *
//      * @method valid
//      * @return boolean true if the doubly linked list contains any more nodes, false otherwise.
//      */
//     public Valid(): boolean {
//         return (this.key >= 0 && this.key < this.length);
//     }

//     /**
//      * Export the list to array
//      *
//      * @method toArray
//      * @return Array   The exported array
//      */
//     public ToArray(): Array<any> {
//         let list = [];
//         let current = this.head;
//         while (current) {
//             list.push(current.value);
//             current = current.next;
//         }
//         return list;
//     }

//     /**
//      * Serializes the list to string
//      *
//      * @method toString
//      * @return string   The serialized string.
//      */
//     public ToString(): string {
//         return '{' + this.ToArray().join('->') + '}';
//     }
// }

// /**
//  * DoublyLinkedList element
//  * @interface
//  */
// export interface IDoublyLinkedListNode {
//     value: any;
//     prev: IDoublyLinkedListNode;
//     next: IDoublyLinkedListNode;
// }
