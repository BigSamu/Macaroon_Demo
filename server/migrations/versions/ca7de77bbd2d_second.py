"""second

Revision ID: ca7de77bbd2d
Revises: a1c246c1db5c
Create Date: 2021-12-03 11:55:55.164636

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ca7de77bbd2d'
down_revision = 'a1c246c1db5c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('caveats', 'title')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('caveats', sa.Column('title', mysql.VARCHAR(length=255), nullable=False))
    # ### end Alembic commands ###
