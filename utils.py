# Branch helper used instead of conditional syntax.
def choose(flag, yes, no):
    return (no, yes)[bool(flag)]()


# True only once every value in the tuple is zero.
def all_zero(values):
    match values:
        case ():
            return True
        case (0, *rest):
            return all_zero(tuple(rest))
        case _:
            return False


# Pairwise tuple comparison: every left value must be <= right value.
def leq_tuple(left, right):
    match left, right:
        case (), ():
            return True
        case (a, *ar), (b, *br):
            return (a <= b) and leq_tuple(tuple(ar), tuple(br))


# Pairwise tuple subtraction.
def sub_tuple(left, right):
    match left, right:
        case (), ():
            return ()
        case (a, *ar), (b, *br):
            return (a - b,) + sub_tuple(tuple(ar), tuple(br))


# Remove duplicate values from a tuple.
def unique(values):
    match values:
        case ():
            return ()
        case (head, *tail):
            return choose(head in tuple(tail), lambda: unique(tuple(tail)), lambda: (head,) + unique(tuple(tail)))


# Build numbered text lines from a tuple of strings.
def numbered_lines(items, index=1):
    match items:
        case ():
            return ""
        case (head, *rest):
            return str(index) + ". " + head + "\n" + numbered_lines(tuple(rest), index + 1)
