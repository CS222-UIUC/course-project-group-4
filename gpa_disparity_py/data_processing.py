import pandas as pd
def gpa_calc(item):
    #gpa points
    gpa_total = 4*item["a_plus"] + 4*item["a"] + 3.67*item["a_minus"] + 3.33*item["b_plus"] + 3*item["b"] + 2.67*item["b_minus"] + 2.33*item["c_plus"] + 2*item["c"] + 1.67*item["c_minus"] + 1.33*item["d_plus"] + 1*item["d"] + .67*item["d_minus"] + 0*item["f"]
    
    # total grades
    total = item["a_plus"] + item["a"] + item["a_minus"] + item["b_plus"] + item["b"] + item["b_minus"] + item["c_plus"] + item["c"] + item["c_minus"] + item["d_plus"] + item["d"] + item["d_minus"] + item["f"]

    item["average_gpa"] = gpa_total/total
    print(item["average_gpa"])
    return item
    
def percent_4 (item):
    #number of 4.0
    total_As = item["a_plus"] + item["a"]
    # total grades
    total = item["a_plus"] + item["a"] + item["a_minus"] + item["b_plus"] + item["b"] + item["b_minus"] + item["c_plus"] + item["c"] + item["c_minus"] + item["d_plus"] + item["d"] + item["d_minus"] + item["f"]

    item["percent_4"] = total_As/total * 100
    print(item["percent_4"])
    return item

def process_gpa(objs):
    results = map(gpa_calc, objs)
    # print(list(results))
    return list(results)
    
def process_4s(objs):
    results = map(percent_4, objs)
    # print(list(results))
    return list(results)
