import React, { useState, useEffect } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useStyles } from "./utils";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const ChatBot = () => {
    const classes = useStyles();

    const [query, setQuery] = useState('Hi')

    const [container, setContainer] = useState([])

    const [lastPoint, setlastPoint] = useState('');

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'ai-chatbot.p.rapidapi.com'
            }
        };

        fetch(`https://ai-chatbot.p.rapidapi.com/chat/free?message=${query}&uid=user1`, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setContainer([data])
            })
            .catch(err => console.error(err));
    }, [lastPoint])

    const onChangeHandler = e => {
        setQuery(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault()
        setlastPoint(query)
    }

    return (
        <div>
            <Box
                border={0}
                borderRadius={3}
                boxShadow="10px 10px 20px #ccc"
                padding={3}
                margin={"auto"}
                marginTop={3}
                display="flex"
                flexDirection={"column"}
                width={"60%"}
            >
                <form onSubmit={submitHandler}>
                    <Typography
                        className={classes.font}
                        fontWeight={"bold"}
                        padding={3}
                        color="grey"
                        variant="h3"
                        textAlign={"center"}
                    >
                        ChatBot
                    </Typography>
                    <Box
                        border={0}
                        borderRadius={5}
                        boxShadow="10px 10px 20px #ccc"
                        padding={3}
                        margin={"auto"}
                        marginTop={3}
                        display="flex"
                        flexDirection={"column"}
                        width={"90%"}
                    >
                        <TextField
                            sx={{ m: 2, borderRadius: 4 }}
                            type="text"
                            className={classes.font}
                            name="title"
                            onChange={onChangeHandler}
                            value={query}
                            margin="auto"
                            variant="outlined"
                        />
                        <Button
                            sx={{ mt: 2, borderRadius: 4 }}
                            variant="contained"
                            color="success"
                            type="submit">submit</Button>
                    </Box>
                </form>


                {container.map((item) => {
                    return (
                        <Box
                            border={0}
                            borderRadius={5}
                            boxShadow="10px 10px 20px #ccc"
                            padding={3}
                            margin={"auto"}
                            marginTop={3}
                            marginBottom={3}
                            display="flex"
                            flexDirection={"column"}
                            width={"90%"}
                        >
                            <Typography
                                className={classes.font}
                                padding={3}
                                color="grey"
                                variant="P"
                                textAlign={"center"}
                            >
                                {item.chatbot.response}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>

        </div >
    )
}

export default ChatBot