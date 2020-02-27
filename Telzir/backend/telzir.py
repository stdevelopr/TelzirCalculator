from typing import Dict, Tuple

# (ddd_orig,ddd_dest) : $min
code: Dict[Tuple[str,str], float] = {
    ("011","016") : 1.90,
    ("016", "011") : 2.90,
    ("011", "017") : 1.70,
    ("017", "011") : 2.70,
    ("011", "018") : 0.90,
    ("018", "011") : 1.90
}


def normal_price(orig: str, dest: str, time: int) -> float or None:
    try:    
        price = code[(orig, dest)]
    except:
        return None
    return price * time


def fale_mais(orig: str, dest: str, plan: int, time: int) -> float or None:
    try:    
        price = code[(orig, dest)]
    except:
        return None

    extra_time = time - plan
    final_price = 1.1 * price * extra_time
    if final_price > 0:
        return round(final_price,4)
    else:
        return 0