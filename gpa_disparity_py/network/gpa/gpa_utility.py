def calculate_average_gpa(item):
    # gpa points
    gpa_total = (
        4 * int(item["A+"])
        + 4 * int(item["A"])
        + 3.67 * int(item["A-"])
        + 3.33 * int(item["B+"])
        + 3 * int(item["B"])
        + 2.67 * int(item["B-"])
        + 2.33 * int(item["C+"])
        + 2 * int(item["C"])
        + 1.67 * int(item["C-"])
        + 1.33 * int(item["D+"])
        + 1 * int(item["D"])
        + 0.67 * int(item["D-"])
        + 0 * int(item["F"])
    )

    # total grades
    total = (
        int(item["A+"])
        + int(item["A"])
        + int(item["A-"])
        + int(item["B+"])
        + int(item["B"])
        + int(item["B-"])
        + int(item["C+"])
        + int(item["C"])
        + int(item["C-"])
        + int(item["D+"])
        + int(item["D"])
        + int(item["D-"])
        + int(item["F"])
    )
    avg = gpa_total / total
    return str(avg)


def calculate_percent_four_point_zero(item):
    # number of 4.0
    total_As = int(item["A+"]) + int(item["A"])
    # total grades
    total = (
        int(item["A+"])
        + int(item["A"])
        + int(item["A-"])
        + int(item["B+"])
        + int(item["B"])
        + int(item["B-"])
        + int(item["C+"])
        + int(item["C"])
        + int(item["C-"])
        + int(item["D+"])
        + int(item["D"])
        + int(item["D-"])
        + int(item["F"])
    )
    percent_4 = total_As / total * 100
    return str(percent_4)


def process_gpa(objs):
    results = map(calculate_average_gpa, objs)
    return list(results)


def process_4s(objs):
    results = map(calculate_percent_four_point_zero, objs)
    return list(results)
