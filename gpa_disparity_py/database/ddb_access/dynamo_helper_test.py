import GPA
from dynamo_helper import dynamo_helper

def IF_insert_and_query_same_item_THEN_return_same_item():
    h = dynamo_helper()
    test_target = GPA.GPA("00000", "sp")
    h.GPA_insert(test_target)

    test_response = h.GPA_get(GPA.GPARequest("00000", "sp"))

    assert test_target.CRN == test_response.CRN

if __name__ == "__main__":
    IF_insert_and_query_same_item_THEN_return_same_item()