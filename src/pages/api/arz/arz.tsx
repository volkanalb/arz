import React, { useState, useEffect } from 'react';
import { set } from 'zod';

interface Arz {
  companyName: string
  bistCode: string
  ipoPrice: number
  ipoStartDate: string
  ipoEndDate: string
  shareCount: number
  bistListingDate: string
  status: string
}

function StockList() {
  const [jsonArray, setJsonArray] = useState<Arz[]>([]);

  function fillData() { 
    fetchData().then((data) => {
      setJsonArray(data);
    }, (error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    fillData();
  }, []);

  return (
    <div>
      <h1>Stock List</h1>
      <table>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>BIST Code</th>
            <th>IPO Price</th>
            <th>IPO Start Date</th>
            <th>IPO End Date</th>
            <th>Share Count</th>
            <th>BIST Listing Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jsonArray.map((arz, index) => (
            <tr key={index}>
              <td>{arz.companyName}</td>
              <td>{arz.bistCode}</td>
              <td>{arz.ipoPrice}</td>
              <td>{arz.ipoStartDate}</td>
              <td>{arz.ipoEndDate}</td>
              <td>{arz.shareCount}</td>
              <td>{arz.bistListingDate}</td>
              <td>{arz.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

async function fetchData(): Promise<Arz[]> {
  try {
    const url = 'https://raw.githubusercontent.com/volkanalb/Halka-Arz/main/arz.json';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Arz[] = await response.json() as Arz[];
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function fetchArz(): Promise<Arz[]> {
  return fetchData();
}

export type { Arz };
export default StockList;