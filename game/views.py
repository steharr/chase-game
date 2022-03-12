from django.shortcuts import render


def game(request):
    """Displays game board"""
    rows = 15
    cols = 30
    context = {
        'rows': range(rows, -1, -1),
        'cols': range(0, cols, 1),
        'rows_total': rows,
        'cols_total': cols,
    }
    return render(request, 'game/game.html', context)
