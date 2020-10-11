import React from "react"
import ListView from "./listView"




const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;

function genData(pIndex = 0, dataBlobs, rowIDs, sectionIDs) {
  console.log(pIndex)
  if(pIndex > 3) return {dataBlobs, rowIDs, sectionIDs}

  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }

  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
  return {dataBlobs, rowIDs, sectionIDs}
}

let data = [...new Array(100)].map((i, index) => ({
  img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
  title: 'title' + index,
  des: "des" + index,
}))


let index = 0;
const row = (rowData, sectionID, rowID) => {
  const obj = data[index++];
  return (
    <div key={rowID} style={{ padding: '0 15px' }}>
      <div
        style={{
          lineHeight: '50px',
          color: '#888',
          fontSize: 18,
          borderBottom: '1px solid #F6F6F6',
        }}
      >{obj.title}</div>
      <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
        <div style={{ lineHeight: 1 }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
          <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
        </div>
      </div>
    </div>
  );
};

const ListCards = () => {
  // data, rowComponent, genData onEndReached
  const onEndReached = (event) => console.log("onEndReached", event)
  return (
    <ListView
      rowComponent={row}
      onEndReached={onEndReached}
      genData={genData}

    ></ListView>
  )
}

export default ListCards