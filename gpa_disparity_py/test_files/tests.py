import data_processing

#Test file sample data - https://github.com/wadefagen/datasets/blob/master/gpa/raw/wi2021_2022.csvhttps://github.com/wadefagen/datasets/blob/master/gpa/raw/wi2021_2022.csv using this link
# would like to figure out how to process csv so can use it for easy testing
# dataset = pd.read_csv(https://raw.githubusercontent.com/wadefagen/datasets/master/gpa/raw/wi2021_2022.csv)
# just test each row
# subset of data that we want (subset of rows followed by columns) -- subset = dataset.iloc[1:34, 6:18]
def ACE_test_gpa():
    # ACE test
    objs = [{"a_plus": 0, "a": 6, "a_minus": 4, "b_plus": 3, "b": 5,"b_minus": 3,"c_plus": 2,"c": 1, "c_minus": 0,"d_plus": 0,"d": 0,"d_minus": 0,"f":1 }]
    actual_gpa_avg = data_processing.process_gpa(objs)
    expected_gpa_avg = [3.13]
    # ideally can use pandas to put all the data into one list and test it, thus the for loop
    for index in range(len(objs)-1):    
        assert actual_gpa_avg[0]["average_gpa"] == expected_gpa_avg[0], "if you see this message, assertion failed"

def ACE_test_4s():
    # ACE test
    objs = [{"a_plus":0, "a": 6, "a_minus": 4, "b_plus": 3, "b": 5,"b_minus": 3,"c_plus": 2,"c": 1, "c_minus": 0,"d_plus": 0,"d": 0,"d_minus": 0,"f":1 }]
    actual_4s = data_processing.process_4s(objs)
    # is a percent
    expected_4s = [24]
    for index in range(len(objs)-1):    
        assert actual_4s[0]["percent_4"] == expected_4s[0], "if you see this message, assertion failed"