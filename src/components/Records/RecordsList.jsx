import { useEffect, useState } from 'react';
import { getRecords } from '../../services/records';
import './records.scss';

function RecordsList() {
  const [order, setOrder] = useState('timeSpend');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(getRecords(order));
  }, [order]);

  return (
    <div className="records-list">
      <div className="order-by">
        <label>Order by:</label>
        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="difficulty">Difficulty</option>
          <option value="timeSpend">Time spent</option>
          <option value="timeStart">Time start</option>
          <option value="timeEnd">Time end</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Start</th>
            <th>End</th>
            <th>Time spent</th>
            <th>Game Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.difficulty}</td>
              <td>
                {new Date(record.startTime).toLocaleString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </td>
              <td>
                {new Date(record.endTime).toLocaleString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </td>
              <td>{record.timeSpend} s.</td>
              <td>{record.gameStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordsList;
