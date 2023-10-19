import { useState } from 'react';
const initialItems = [
  { id: 1, description: 'Kem đánh răng', quantity: 2, packed: false },
  { id: 2, description: 'Bàn chải đánh răng', quantity: 12, packed: false },
  { id: 3, description: 'Quần chip', quantity: 2, packed: false },
  { id: 4, description: 'Dầu gội đầu', quantity: 2, packed: false },
];
function App() {
  const [listItem, setListItem] = useState(initialItems);
  const numberOfItems = listItem.length;
  const percentOfItemsFinished = (
    (listItem.reduce((coun, item) => (item.packed ? coun + 1 : coun), 0) /
      numberOfItems) *
    100
  ).toFixed(2);
  function handlerDelete(id) {
    setListItem(s => s.filter(item => item.id !== id));
  }
  function handlePacked(id) {
    // udpate list item
    setListItem(
      listItem.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form {...{ setListItem, listItem }} />
      <PackingList {...{ listItem, handlerDelete, handlePacked }} />
      <Stats {...[numberOfItems, percentOfItemsFinished]} />
    </div>
  );
}
function Logo() {
  return (
    <div>
      <h1>🎠🎫This is app Logo🎪🎢</h1>
    </div>
  );
}
function Form(props) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  function handlerSumit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      package: false,
      id: new Date(),
    };
    props.setListItem(s => [...props.listItem, { ...newItem }]);
    setDescription('');
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handlerSumit}>
      <h3>wha do you need for your rip ?</h3>
      <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(i => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Ghi cc gì vào trong đây đi"
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList(props) {
  console.log(props);
  return (
    <div className="list">
      <ul>
        {props.listItem.map(item => (
          <Item
            item={item}
            onDelete={props.handlerDelete}
            key={item.id}
            handlePacked={props.handlePacked}
          />
        ))}
      </ul>
      <div className="ac"></div>
    </div>
  );
}
function Stats(props) {
  console.log(props);
  return (
    <footer className="stats">
      <strong>You have {props[0]} item in your list</strong>
      <br />
      <em>You have finished {props[1]}%</em>
      <br />
      <input type="range" min={0} max={props[0]} value={props[1]} />
    </footer>
  );
}
function Item(props) {
  return (
    <li>
      <span>
        <input
          type="checkbox"
          onClick={() => props.handlePacked(props.item.id)}
        ></input>
        &nbsp;
        {props.item.quantity} &nbsp;
        {props.item.description}
      </span>
      <button onClick={() => props.onDelete(props.item.id)}>
        {props.item.packed ? '✅' : '❌'}
      </button>
    </li>
  );
}

export default App;
