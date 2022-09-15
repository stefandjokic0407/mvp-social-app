import Fuse from 'fuse.js';

export default function fuzzySearch(options) {
    const fuse = new Fuse(options, {
        keys: ['name', 'groupName', 'items.name'],
        threshold: 1.0,
    });

    return (value) => {
        if (!value.length) {
            return options;
        }

        return fuse.search(value);
    };
}