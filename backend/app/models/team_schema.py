def validate_team(data):
    if "team_name" not in data:
        raise ValueError("Team name is required")
