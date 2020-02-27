import telzir


def test_normal_price():
    assert telzir.normal_price("011", "016", 20) == 38
    assert telzir.normal_price("011", "017", 80) == 136
    assert telzir.normal_price("018", "011", 200) == 380
    assert telzir.normal_price("018", "017", 100) == None


def test_fale_mais():
    assert telzir.fale_mais("011", "016", 30, 20) == 0
    assert telzir.fale_mais("011", "017", 60, 80) == 37.40
    assert telzir.fale_mais("018", "011", 120, 200) == 167.20
    assert telzir.fale_mais("018", "017", 30, 100) == None