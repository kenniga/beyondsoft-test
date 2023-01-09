import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HistoryIcon from '@mui/icons-material/History';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { search } from '@redux/actions/search';
import { selectPlace } from '@redux/actions/selectPlace';

import styles from './style.module.scss'


function SearchForm({ search, selectPlace, results, previouselySelectedPlace }) {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {

        let newOptions = [];

        if (value) {
            newOptions = [value];
        }

        if (previouselySelectedPlace.length > 0) {
            const [firstPreviouslySelected, secondPreviouslySelected] = previouselySelectedPlace;
            if (firstPreviouslySelected) {
                newOptions.push(firstPreviouslySelected)
            }

            if (secondPreviouslySelected) {
                newOptions.push(secondPreviouslySelected)
            }
        }

        if (results.searchHistory.length > 0) {
            newOptions = [...newOptions, ...results.searchHistory[0].searchResults];
        }

        setOptions(newOptions);

    }, [value, inputValue, results, previouselySelectedPlace]);


    return (
        <Autocomplete
            id="google-map"
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            className={styles.input}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                selectPlace(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                search(newInputValue)
            }}
            renderInput={(params) =>
            (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Choose a location"
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",

                            legend: {
                                marginLeft: "30px"
                            }
                        },
                        "& .MuiAutocomplete-inputRoot": {
                            paddingLeft: "20px !important",
                            borderRadius: "50px",
                            background: "white"
                        },
                        "& .MuiInputLabel-outlined": {
                            paddingLeft: "20px"
                        },
                        "& .MuiInputLabel-shrink": {
                            marginLeft: "20px",
                            paddingLeft: "10px",
                            paddingRight: 0,
                            background: "white"
                        }
                    }}
                />
            )
            }
            renderOption={(props, option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                const OptionItemIcon = option.isPreviouslySelected ? HistoryIcon : LocationOnIcon
                const key = option.isPreviouslySelected ? `previously-selected-${ props["data-option-index"] }` : props.key
                return (
                    <li {...props} key={key}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <OptionItemIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}

                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}

const mapStateToProps = state => ({
    results: state.search,
    previouselySelectedPlace: state.selectedPlace.previouselySelectedPlace
});

export default connect(mapStateToProps, { search, selectPlace })(SearchForm);