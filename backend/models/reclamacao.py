import enum
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text, DateTime, ForeignKey, Enum
from typing import TYPE_CHECKING
from backend.extensions import db

if TYPE_CHECKING:
    from .contestacao import Contestacao
    from .foto import FotoReclamacao
    from .user import User


class StatusReclamacao(enum.Enum):
    PENDENTE = "pendente"
    RESOLVIDA = "resolvida"
    CONTESTADA = "contestada"


class Reclamacao(db.Model):
    __tablename__ = 'reclamacoes'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    titulo: Mapped[str] = mapped_column(String(255), nullable=False)
    descricao: Mapped[str] = mapped_column(Text, nullable=False)
    cidade: Mapped[str] = mapped_column(String(100), nullable=False)
    endereco: Mapped[str] = mapped_column(String(255), nullable=True)
    latitude: Mapped[float] = mapped_column(nullable=True)
    longitude: Mapped[float] = mapped_column(nullable=True)
    status: Mapped[str] = mapped_column(
        Enum(StatusReclamacao),
        default=StatusReclamacao.PENDENTE,
        nullable=False
    )
    
    usuario_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    usuario: Mapped["User"] = relationship("User", back_populates="reclamacoes")
    
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    data_resolucao: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    data_atualizacao: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    contestacoes: Mapped[list["Contestacao"]] = relationship( # type: ignore
        "Contestacao",
        back_populates="reclamacao",
        cascade="all, delete-orphan"
    )
    
    fotos: Mapped[list["FotoReclamacao"]] = relationship( # type: ignore
        "FotoReclamacao",
        back_populates="reclamacao",
        cascade="all, delete-orphan"
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'cidade': self.cidade,
            'endereco': self.endereco,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'status': self.status.value if isinstance(self.status, StatusReclamacao) else self.status,
            'usuario_id': self.usuario_id,
            'autor': self.usuario.username,
            'data_criacao': self.data_criacao.isoformat() if self.data_criacao else None,
            'data_resolucao': self.data_resolucao.isoformat() if self.data_resolucao else None,
            'data_atualizacao': self.data_atualizacao.isoformat() if self.data_atualizacao else None,
            'fotos': [foto.to_dict() for foto in self.fotos],
            'contestacoes': [c.to_dict() for c in self.contestacoes]
        }