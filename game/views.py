from django.shortcuts import render


def game(request):
    """Displays game board"""
    rows = 10
    cols = 10
    context = {'rows': rows, 'cols': cols}
    return render(request, 'game/game.html', context)
