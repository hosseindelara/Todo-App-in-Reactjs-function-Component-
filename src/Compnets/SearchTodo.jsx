import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import SearchResult from './SearchResult'

export default function SearchTodo(props) {
    const [Searchvalue, setSearchvalue] = useState('')

    const { itemSerch } = props

    const HandelSearch = e => setSearchvalue(e.target.value)



   let SerchinPut =  itemSerch.filter((item)=>{
        if(item.todotitle==Searchvalue)
        return true;
        else
            return false;
    })

console.log(SerchinPut);
    return (
        <Row>
            <Col lg={12} md={12} sm={12} xs={12} className='mt-3'>
                <Form.Control
                    value={Searchvalue}
                    onChange={HandelSearch}
                    type='text'
                    placeholder='جستجو در میان کار ها'
                />
            </Col>
            {
                        SerchinPut?
                            SerchinPut.map((item, index) => (
                                <SearchResult
                                    key={index}
                                    titlte={item.todotitle}
                                    id={item.id}
                                    time={item.DateGenerit}
                                    EndDayTask={item.EndDay}
                                    
                                />
                            ))
                        :null
                    }
        </Row>
    )
}
