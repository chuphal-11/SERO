

import React, { useState, useEffect } from 'react';
const Search = ({ setStartPos, setEndPos, search_value_st, set_search_value_st, search_value_end, set_search_value_end }) => {
  const [filteredNames, setFilteredNames] = useState([]); 
  const [searchData, setSearchData] = useState([]); 
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  const search_bar = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/search', { method: 'GET' });
      const ans = await response.json();
      setSearchData(ans); 
      setFilteredNames(ans.map(item => item.name));
      console.log("Search data: ", ans);
    } catch (error) {
      console.log('Error - ', error);
    }
  };

  useEffect(() => {
    search_bar();
  }, []);

  useEffect(() => {
    const isStartCoords = (
      typeof search_value_st[0] === 'number' &&
      !isNaN(search_value_st[0]) &&
      typeof search_value_st[1] === 'number' &&
      !isNaN(search_value_st[1])
    );

    const isEndCoords = (
      typeof search_value_end[0] === 'number' &&
      !isNaN(search_value_end[0]) &&
      typeof search_value_end[1] === 'number' &&
      !isNaN(search_value_end[1])
    );

    if (isStartCoords && isEndCoords) {
      console.log("Coordinates detected:", search_value_st, search_value_end);
      setValue(`${search_value_st[0]},${search_value_st[1]}`);
      setValue2(`${search_value_end[0]},${search_value_end[1]}`);
    } else {
      setValue(search_value_st);
      setValue2(search_value_end);
    }
  }, [search_value_end, search_value_st]);

  const onchange = (e) => setValue(e.target.value);
  const onchange2 = (e) => setValue2(e.target.value);

  const onsearch = (searchTerm) => {
    setValue(searchTerm);  
    const matchedItem = searchData.find(item => item.name === searchTerm);
    console.log(matchedItem);
  };

  const onsearch2 = (searchTerm) => {
    setValue2(searchTerm);  
    console.log(searchTerm);  
  };

  const handle_path = (value, value2) => {
    const data1 = searchData.find(item => item.name === value);
    const data2 = searchData.find(item => item.name === value2);

    if (!data1 || !data2) {
      console.log("Missing data for one of the search terms");
      return;
    }

    try {
      setStartPos([parseFloat(data1.lat), parseFloat(data1.lon)]);
      setEndPos([parseFloat(data2.lat), parseFloat(data2.lon)]);
    } catch (error) {
      console.log("Error parsing coordinates: ", error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="inp2">START - </label>
        <input type="text" value={value} onChange={onchange} id='inp2' />
      </div>
      <div className='dropdown'>
      {searchData
          .filter(item => {
            const searchTerm = typeof value === 'string' ? value.toLowerCase() : '';
            const name = item.name ? item.name.toLowerCase() : '';
            return searchTerm && name.startsWith(searchTerm) && name !== searchTerm;
          })
          .slice(0, 5)
          .map((item, index) => (
            <div key={index} onClick={() => onsearch(item.name)}>
              {item.name}
            </div>
          ))}
      </div>

      <div>
        <label htmlFor="inp2">END - </label>
        <input type="text" value={value2} onChange={onchange2} id='inp2' style={{ marginLeft: '15px' }} />
      </div>
      <div className='dropdown'>
      {searchData
            .filter(item => {
              const searchTerm = typeof value2 === 'string' ? value2.toLowerCase() : '';
              const name = item.name ? item.name.toLowerCase() : '';
              return searchTerm && name.startsWith(searchTerm) && name !== searchTerm;
            })
          .slice(0, 5)
          .map((item, index) => (
            <div key={index} onClick={() => onsearch2(item.name)}>
              {item.name}
            </div>
          ))}
      </div>

      <button onClick={() => handle_path(value, value2)}>search</button>
    </div>
  );
};

export default Search;
