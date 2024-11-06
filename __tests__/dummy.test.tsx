import { describe, test, expect } from 'vitest';
import React from 'react';
import { screen, render } from '@testing-library/react';

const Dummy = () => {
    return (
        <div>
            <h1>Dummy</h1>
        </div>
    );
};

describe('Test setup for React component', () => {
    test('Should have 1 header.', async () => {
        render(<Dummy />);
        expect(await screen.getAllByRole('heading')).toHaveLength(1);
    });
});
