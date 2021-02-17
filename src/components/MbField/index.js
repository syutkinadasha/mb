import React, {useState, useEffect, useCallback} from 'react';
import cn from 'classnames';
import getRandomShips from "../../utils/getRandomShips";
import './MbField.sass';

const mbRows = [1,2,3,4,5,6,7,8,9,10];
const mbCols = ['a','b','c','d','e','f','g','h','i','j'];

function mdFieldElements(ships) {
	return mbRows.reduce((acc, rVal, rKey) => {
		return [...acc, ...mbCols.map((cVal, cKey) => {
			const itemId = `${cVal}${rVal}`;
			return {
				id: itemId,
				ship: ships[cKey][rKey] === 2,
				open: false,
			}
		})]
	}, [])
}

const MbField = () => {
	const [elements, setElements] = useState([]);
	const [col, setCol] = useState('');
	const [row, setRow] = useState('');

	const onChange = useCallback((type, e) => {
		if (type === 'col')
			setCol(e.target.value);

		if (type === 'row')
			setRow(e.target.value);
	}, [])

	const onSubmit = useCallback(() => {
		const itemId = `${col}${row}`;
		const resEls = [...elements].map((item) => {
			return {...item, open: item.id === itemId ? true : item.open }
		})

		setElements(resEls);
		setCol('');
		setRow('');
	}, [col, row, elements])

	useEffect(() => {
		setElements(mdFieldElements(getRandomShips()));
	}, [])

	return (
		<div className="MbField">
			<div className="MbField__inputs">
				<label htmlFor="mbc">Column</label><input id="mbc" type="text" maxLength="1" size="1" onChange={(e) => onChange('col', e)} value={col}/>
				<label htmlFor="mbr">Row</label><input id="mbr" type="text" maxLength="2" size="1" onChange={(e) => onChange('row', e)} value={row}/>
				<button type="button" onClick={onSubmit}>Отправить</button>
			</div>
			<div className="MbField__list-wrap">
				<div className="MbField__cols">
					{ mbCols.map((col, key) => (<div key={`col_${key}`} className="MbField__cols-item">{col}</div>)) }
				</div>
				<div className="MbField__rows">
					{ mbRows.map((row, key) => (<div key={`row_${key}`} className="MbField__rows-item">{row}</div>)) }
				</div>
				<div className="MbField__list">
					{
						elements.map((item) => {
							return (
								<div
									key={item.id}
									className={cn('MbField__item', {'MbField__item_open': item.open === true}, {'MbField__item_ship': item.ship === true && item.open === true})} />
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default MbField;