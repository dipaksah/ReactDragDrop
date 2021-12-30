import { memo } from 'react';
import { useDrag } from 'react-dnd';
const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
    marginLeft:'100px',
    marginTop:'20px',
};
export const Box = memo(function Box({ Correct, Key, type, isDropped }) {
    const [{ opacity }, drag] = useDrag(() => ({
        type,
        item: { Correct},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [Correct]);
    console.log(Key);
    return (<div ref={drag}  role="Box" style={{ ...style, opacity }}>
			{isDropped ? <s>{Correct}</s> : Correct}
            {/* {Key} */}
		</div>);
});
