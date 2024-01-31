from typing import Any
from rest_framework.response import Response


def json_response(status: str, message:str=None, data:Any=None) -> Response:
    status = status.lower()
    STATUSES = ('success', 'error')
    if status not in STATUSES:
        return "bad status"
    
    result_data: dict = {"status": status}

    if message is not None:
        result_data["message"] = message
    elif data is not None:
        result_data["data"] = data
    
    return Response(result_data)
