import { useState, useCallback, memo } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
export const Container = memo(function Container() {
    const [dustbins, setDustbins] = useState([
        { accepts: [ItemTypes.GLASS]},
        { accepts: [ItemTypes.GLASS] },
        {
            accepts: [ItemTypes.GLASS, ItemTypes.GLASS, NativeTypes.URL],
            
        },
        // { accepts: [ItemTypes.GLASS, NativeTypes.FILE] },
    ]);
    
    const [boxes] = useState([
        { question:'How many time zones are there in Russia?', correct: '11', type: ItemTypes.GLASS },
        { question:'Whats the national flower of Japan?', correct: 'Cherry blossom', type: ItemTypes.GLASS },
        { question:'Whats the national animal of Australia?', correct: 'Red Kangaroo', type: ItemTypes.GLASS },
    ]);

    const [droppedBoxNames, setDroppedBoxNames] = useState([]);
    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }

    const handleDrop = useCallback((index, item) => {
        const { correct } = item;
        setDroppedBoxNames(update(droppedBoxNames,correct ? { $push: [correct] } : { $push: [] }));
        setDustbins(update(dustbins, {
            [index]: {
                lastDroppedItem: {
                    $set: item,
                },    
            },
        }));
    }, [droppedBoxNames, dustbins]);
    // console.log(boxes);
    
    return (<div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{dustbins.map(({ accepts,  lastDroppedItem}, 
                index) => (<Dustbin accept={accepts} 
                lastDroppedItem={lastDroppedItem}
                allQuestion={boxes[index]} 
                onDrop={(item) => handleDrop(index, item)} key={index}/>))}
			</div>

			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{boxes.map(({ correct, type, question }, 
                index) => (<Box Correct={correct} type={type} Question={question} Key={index}
                isDropped={isDropped(correct)} key={index}/>))}
			</div>
		</div>);
});