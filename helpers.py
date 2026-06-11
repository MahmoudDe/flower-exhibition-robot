def when(condition, then_call, else_call):
    return then_call() if condition else else_call()


def is_empty(values):
    return all(value == 0 for value in values)


def amounts_fit(requested, available):
    return all(left <= right for left, right in zip(requested, available))


def subtract_amounts(left, right):
    return tuple(a - b for a, b in zip(left, right))


def deduplicate(values):
    seen = set()
    result = []
    for value in values:
        if value not in seen:
            seen.add(value)
            result.append(value)
    return tuple(result)


def format_numbered_list(items):
    return "".join(str(index) + ". " + line + "\n" for index, line in enumerate(items, start=1))
