import { Calculator } from "../../src";

import {expect} from 'earljs'

describe(Calculator.prototype.add.name, () => {
    it('2 + 2', () => {
        const calculator = new Calculator()
        expect(calculator.add(2,2)).toEqual(4)
    })
})