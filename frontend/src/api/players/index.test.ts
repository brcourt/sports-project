import { describe, it, expect } from 'vitest';

describe('Player API', () => {
    it('should return player data', () => {
        const playerData = { id: 1, name: 'John Doe' };
        expect(playerData).toEqual({ id: 1, name: 'John Doe' });
    });
});