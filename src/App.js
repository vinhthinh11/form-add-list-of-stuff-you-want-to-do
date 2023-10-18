import { useState } from 'react';
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Quần chip', quantity: 2, packed: false },
];
function App() {
  const [listItem, setListItem] = useState(initialItems);
  return (
    <div className="app">
      <Logo />
      <Form {...{ setListItem, listItem }} />
      <PackingList {...{ listItem }} />
      <Stats />
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
          <Item {...item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You hae X iem in your list</em>
    </footer>
  );
}
function Item(props) {
  const [packed, setPacked] = useState(props.packages);
  return (
    <li onClick={() => setPacked(!packed)}>
      <span>
        {props.quantity} &nbsp;
        {props.description}
      </span>
      <button onClick={() => setPacked(!packed)}>{packed ? '✅' : '❌'}</button>
    </li>
  );
}

export default App;
