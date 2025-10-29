module object::object {

    public struct Entry has store, copy, drop {
        text: vector<u8>,
    }

    public struct Object has key, store {
        id: object::UID,
        owner: address,
        entries: vector<Entry>,
    }

    public fun create(ctx: &mut tx_context::TxContext) {
        let obj = Object {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            entries: vector::empty(),
        };
        transfer::share_object(obj);
    }
}
