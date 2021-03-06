import { assert, expect } from 'chai';
import 'mocha';
import { Index } from '../lib/index';
import { DataFrame } from '../lib/dataframe';
import { ArrayIterable } from '../lib/iterables/array-iterable';

describe('DataFrame index', () => {

	it('default index is generated', function () {
		
		var column = new DataFrame([100, 200]);
		expect(column.toPairs()).to.eql([			
			[0, 100],
			[1, 200]			
		]);		
    });
    
    it('can set new index for dataframe from array', () => {
        var dataframe = new DataFrame([10, 20, 30]);
        var newDataFrame = dataframe.withIndex([11, 22, 33]);
        expect(newDataFrame.getIndex().toArray()).to.eql([11, 22, 33]);
    });

    it('can set new index for dataframe from dataframe', () => {
        var dataframe = new DataFrame([10, 20, 30]);
        var newDataFrame = dataframe.withIndex(new DataFrame([11, 22, 33]));
        expect(newDataFrame.getIndex().toArray()).to.eql([11, 22, 33]);
    });

    it('can set new index for dataframe from index', () => {
        var dataframe = new DataFrame([10, 20, 30]);
        var newDataFrame = dataframe.withIndex(new Index([11, 22, 33]));
        expect(newDataFrame.getIndex().toArray()).to.eql([11, 22, 33]);
    });

	it('can set index by column name', function () {

		var dataFrame = new DataFrame({
			columnNames: [ "Date", "Value1", "Value2", "Value3" ],
			rows: [
				[new Date(1975, 24, 2), 100, 'foo', 11],
				[new Date(2015, 24, 2), 200, 'bar', 22],
			],
			index: [5, 6]
        });
		var indexedDataFrame = dataFrame.setIndex("Date");

		expect(indexedDataFrame.getIndex().toArray()).to.eql([
			new Date(1975, 24, 2),
			new Date(2015, 24, 2)
		]);

		expect(indexedDataFrame.toRows()).to.eql([
			[new Date(1975, 24, 2), 100, 'foo', 11],
			[new Date(2015, 24, 2), 200, 'bar', 22],
		]);
	});
   
    it('can set new index using selector', () => {
        var df = new DataFrame([10, 20, 30]);
        var dfWithIndex = df.withIndex(value => value * 2);
        expect(dfWithIndex.getIndex().toArray()).to.eql([20, 40, 60]);
    });
    
    it('can reset index', () => {
        var dataframe = new DataFrame({
            values:  [10, 20, 30],
            index: [11, 22, 33],
        });
        var newDataFrame = dataframe.resetIndex();
        expect(newDataFrame.toPairs()).to.eql([[0, 10], [1, 20], [2, 30]]);
    });
});