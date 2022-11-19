class GPA:

    def __init__(self, CRN, semester) -> None:
        self._CRN = CRN 
        self._semester = semester

    @property
    def CRN(self):
        return self._CRN

    @property
    def semester(self):
        return self._semester

class GPARequest:

    def __init__(self, CRN, semester) -> None:
        self._CRN = CRN 
        self._semester = semester

    @property
    def CRN(self):
        return self._CRN

    @property
    def semester(self):
        return self._semester