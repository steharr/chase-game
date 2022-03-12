from django.shortcuts import render


def game(request):
    """Displays game board"""
    rows = 10
    cols = 10
    context = {'rows': range(rows, -1, -1), 'cols': range(0, cols, 1)}
    return render(request, 'game/game.html', context)
