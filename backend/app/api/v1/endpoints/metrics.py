from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api import deps
from app.schemas.metric import MetricResponse
from app.crud.metric import metric
from app.core.celery_app import celery_app
from app.core.cache import cache

router = APIRouter()

@router.get("/", response_model=List[MetricResponse])
@cache(expire=300)  # Cache for 5 minutes
async def get_metrics(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None)
) -> List[MetricResponse]:
    """
    Retrieve metrics with optional filtering.
    """
    filters = {}
    if category:
        filters["category"] = category
    if start_date:
        filters["start_date"] = start_date
    if end_date:
        filters["end_date"] = end_date
        
    metrics = metric.get_multi(
        db=db,
        skip=skip,
        limit=limit,
        filters=filters
    )
    return metrics

@router.post("/refresh")
async def refresh_metrics(
    background_tasks: BackgroundTasks,
    db: Session = Depends(deps.get_db)
):
    """
    Trigger a refresh of metrics data from external sources.
    """
    task = celery_app.send_task("app.tasks.refresh_metrics")
    return {"task_id": task.id}