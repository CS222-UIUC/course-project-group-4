import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface dropdownProps {
  retrieveMenuItems: () => Promise<string[] | number[]>;
  value: string | number;
  setValue: Dispatch<SetStateAction<string | number>>;
  label: string;
}

//if props is of type any, then we lose type safety
export default function DropDown(props: dropdownProps) {
  // unpack props
  const { retrieveMenuItems, value, setValue, label } = props;
  const [valueList, setValueList] = useState<string[] | number[]>([
    value,
  ] as string[]);

  useEffect(() => {
    retrieveMenuItems().then((menuItems: string[] | number[]) => {
      setValueList(menuItems);
      setValue(menuItems[0]);
    });
  }, [retrieveMenuItems, setValue]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120, maxWidth: 1 / 10, bgcolor: "white" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${value}`}
          label={label}
          onChange={handleChange}
        >
          {
            // https://stackoverflow.com/questions/46908480/how-do-i-use-for-loops-with-react/46908649#46908649
            valueList.map((value, i) => (
              <MenuItem value={value} key={`${value}`}>
                {value}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}
