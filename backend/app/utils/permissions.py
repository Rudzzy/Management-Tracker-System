from app.constants.roles import ADMIN, MANAGER, TECHNICIAN, EMPLOYEE

ROLE_PERMISSIONS = {
    ADMIN: ["*"],
    MANAGER: ["create", "assign", "view"],
    TECHNICIAN: ["view", "update"],
    EMPLOYEE: ["create", "view"]
}

def has_permission(role, action):
    if role not in ROLE_PERMISSIONS:
        return False

    permissions = ROLE_PERMISSIONS[role]

    if "*" in permissions:
        return True

    return action in permissions
