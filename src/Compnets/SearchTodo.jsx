import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import AllTodos from './AllTodos'

export default function SearchTodo(props) {
    const [Searchvalue, setSearchvalue] = useState('')

    const { itemSerch } = props

    const HandelSearch = e => setSearchvalue(e.target.value)



    let SerchinPut = itemSerch.filter((item) => {
        if (item.todotitle === Searchvalue)
            return true;
        else
            return false;
    })

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
            <Col>
           <p className='text-center m-2'> {SerchinPut.length>0 ? SerchinPut.length+' مورد یافت شد '  : null}</p>
                {
                    SerchinPut ?
                        SerchinPut.map((item, index) => (
                            <AllTodos
                                key={index}
                                Arryin={item}
                            />
                        ))
                        : null
                }
            </Col>
        </Row>
    )
}
