'use client';
import { faChevronRight, faMinus, faPenToSquare, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./poolsList.css";


interface PoolListProps {
    id: number;
    name: string;
    grant: string;
    grantable: string;
    granted: string;
    grantVested: string;
    exercised: string;
    transactionData : Array<any>;
    deleteFunc: void;
    editFunc: void;
}

const PoolsListCom: React.FC<PoolListProps> = ({
    id,
    name,
    grant,
    grantable,
    granted,
    grantVested,
    exercised,
    transactionData,
    deleteFunc,
    editFunc
}) => {

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    
    const graphData = {
        datasets: [{
        data: [grantable,granted],
        backgroundColor: ['green', "purple"], // Farklı renkler
        borderColor: ['green', "purple"],    // Farklı renkler
        }]
    };

    const options = {
        cutout: '90%',
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'black', // Color of legend labels
            fontSize: 12, // Font size of legend labels
          }
        }
      };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
        console.log(dropdownVisible)
    };

    useEffect(() => {
        const transactions = transactionData.filter(x=> x.type == "PoolCreation" || x.type == "PoolIncrease" || x.type == "PoolDecrease");
        
        const updatedTransactions = transactions.map(transaction => {
            if (transaction.type === "PoolCreation") {
              return { ...transaction, type: "PoolIncrease" };
            } else {
              return transaction;
            }
          });
          setFilteredTransactions(updatedTransactions);
    }, []);

    const PoolIncrease = (id) => {

    }

    return (
        <div>
            <ul style={{ display: "flex", flexDirection: "row", padding: "0%", height: "50px", width: "auto", paddingTop: "20px"}}>
                <FontAwesomeIcon onClick={toggleDropdown} style={{transform: "translateX(-200%)"}} icon={faChevronRight} />
                <div style={{ width: "100px", fontSize: "10px"}}>{name}</div>
                <div style={{ width: "100px", fontSize: "10px", marginLeft: "12vw" }}>{grant}</div>
                <div style={{ width: "100px", fontSize: "10px", marginLeft: "3vw" }}>{grantable}</div>
                <div style={{ width: "100px", fontSize: "10px", marginLeft: "7vw" }}>{granted}</div>
                <div style={{ width: "100px", fontSize: "10px", marginLeft: "3vw" }}>{grantVested}</div>
                <div style={{ width: "100px", fontSize: "10px", marginLeft: "5vw" }}>{exercised}</div>
                <div style={{width: "100px", marginLeft: "3vw", padding: "0%", transform: "translateY(-50%)"}} >
                    <Doughnut style={{width: "80px", height: "100px"}} data={graphData} options={options} />
                </div>
                <FontAwesomeIcon style={{margin: "7px"}} icon={faPlus} onClick={() => editFunc("PoolIncrease",id)} />
                <FontAwesomeIcon style={{margin: "7px"}} icon={faMinus} onClick={() => editFunc("PoolDecrease",id)} />
                <FontAwesomeIcon style={{margin: "7px"}} icon={faTrashAlt} onClick={() => deleteFunc(id)} />
            </ul>
            {dropdownVisible && (
                <div className='dropdown' >
                    <ul className="detailUl">
                        {filteredTransactions.map((item, index) => (
                            <li key={index} className="DetailLi">
                                <div style={{fontSize: "15px"}}>{new Date(item.date).toLocaleDateString('en-EN')}</div>
                                <div style={{ width: "120px", textAlign: "center", marginLeft: "7vw", fontSize: "13px", backgroundColor: "#f1f5f9", color: "#475569 ", borderRadius: "0.2rem", fontWeight: "500"}} >{item.type}</div>
                                <div style={{marginLeft: "10vw", fontSize: "15px"}} >{item.amount}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PoolsListCom;
